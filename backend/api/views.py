import os
import uuid
import logging
from django.contrib import messages
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt

from .models import SoftwareProduct, TrialRequest, ContactInquiry, UserSubscription, OpticalServiceRequest
from .serializers import (
    SoftwareProductSerializer,
    TrialRequestSerializer,
    ContactInquirySerializer,
    UserSubscriptionSerializer,
    UserSignupSerializer,
    UserLoginSerializer,
    SubscribeSerializer,
    OpticalServiceRequestSerializer
)
from .db_mongo import (
    get_mongo_db,
    sync_user_to_mongodb,
    sync_trial_request_to_mongodb,
    sync_contact_inquiry_to_mongodb,
    sync_subscription_to_mongodb,
    sync_service_request_to_mongodb
)

logger = logging.getLogger(__name__)

def extract_django_messages(request, default_level='info', fallback_msg=None):
    msg_list = []
    try:
        storage = messages.get_messages(request)
        for msg in storage:
            level_tag = msg.level_tag or default_level
            if level_tag == 'danger':
                level_tag = 'error'
            msg_list.append({
                'level': level_tag,
                'message': str(msg)
            })
    except Exception as e:
        logger.warning(f"Failed to extract Django messages: {e}")

    if not msg_list and fallback_msg:
        msg_list.append({
            'level': default_level,
            'message': fallback_msg
        })
    return msg_list

def verify_admin_access(request):
    passcode = request.headers.get('X-Admin-Passcode') or request.META.get('HTTP_X_ADMIN_PASSCODE')
    expected = os.environ.get('ADMIN_PASSCODE', 'aliabbas1234578!')
    if passcode and passcode == expected:
        return True
    return False

@api_view(['GET'])
@authentication_classes([])
@permission_classes([AllowAny])
def health_check(request):
    msg_text = "MicroNanoFabSoft Django & DRF Backend Cluster Active."
    messages.success(request, msg_text)
    return Response({
        'status': 'online',
        'app_name': 'MicroNanoFabSoft Engine',
        'messages': extract_django_messages(request, default_level='success', fallback_msg=msg_text)
    })

@api_view(['GET'])
@authentication_classes([])
@permission_classes([AllowAny])
def get_products(request):
    products = SoftwareProduct.objects.all()
    if not products.exists():
        initial_products = [
            {'name': 'BEAMER', 'code_name': 'beamer_data_prep', 'description': 'Advanced E-Beam Lithography Data Prep, PEC & 3D Fracturing Suite.', 'category': 'Data Prep & PEC', 'version': '2026.1'},
            {'name': 'LAB', 'code_name': 'lab_3d_litho', 'description': '3D Micro & Nano Lithography Simulation (Optical, EBL, EUV & Resist Bake/Dev).', 'category': '3D Simulation', 'version': '2026.1'},
            {'name': 'TRACER', 'code_name': 'tracer_monte_carlo', 'description': 'Monte Carlo Electron-Material Interaction & PSF Energy Deposition Engine.', 'category': 'Monte Carlo Physics', 'version': '2026.1'},
            {'name': 'ProSEM', 'code_name': 'prosem_metrology', 'description': 'Automated SEM Image Analysis, CD Measurement & Line Edge Roughness (LER/LWR).', 'category': 'SEM Metrology', 'version': '2026.1'},
            {'name': 'BEAMER 3D', 'code_name': 'beamer_3d_greyscale', 'description': 'Greyscale Lithography 3D Surface Profiling & Maskless Height Control.', 'category': '3D Greyscale', 'version': '2026.1'},
        ]
        for item in initial_products:
            SoftwareProduct.objects.create(**item)
        products = SoftwareProduct.objects.all()

    serializer = SoftwareProductSerializer(products, many=True)
    return Response({
        'status': 'success',
        'products': serializer.data,
        'messages': extract_django_messages(request, default_level='info', fallback_msg="Loaded MicroNanoFabSoft Software Catalog.")
    })

@csrf_exempt
@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def request_trial(request):
    serializer = TrialRequestSerializer(data=request.data)
    if serializer.is_valid():
        trial = serializer.save()
        msg_text = f"Thank you, {trial.full_name}! Your evaluation license key for '{trial.software_choice}' has been dispatched."
        messages.success(request, msg_text)
        
        trial_dict = serializer.data
        trial_dict['id'] = trial.id
        sync_trial_request_to_mongodb(trial_dict)

        return Response({
            'status': 'success',
            'message': msg_text,
            'trial_id': trial.id,
            'messages': extract_django_messages(request, default_level='success', fallback_msg=msg_text)
        }, status=status.HTTP_201_CREATED)
    
    err_msg = "Could not validate trial request parameters."
    messages.error(request, err_msg)
    return Response({
        'status': 'error',
        'errors': serializer.errors,
        'messages': extract_django_messages(request, default_level='error', fallback_msg=err_msg)
    }, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def contact_inquiry(request):
    serializer = ContactInquirySerializer(data=request.data)
    if serializer.is_valid():
        inquiry = serializer.save()
        msg_text = f"Message received from {inquiry.name}. Our lithography support team will contact you shortly!"
        messages.success(request, msg_text)

        inquiry_dict = serializer.data
        inquiry_dict['id'] = inquiry.id
        sync_contact_inquiry_to_mongodb(inquiry_dict)

        return Response({
            'status': 'success',
            'message': msg_text,
            'inquiry_id': inquiry.id,
            'messages': extract_django_messages(request, default_level='success', fallback_msg=msg_text)
        }, status=status.HTTP_201_CREATED)

    err_msg = "Failed to transmit inquiry message."
    messages.error(request, err_msg)
    return Response({
        'status': 'error',
        'errors': serializer.errors,
        'messages': extract_django_messages(request, default_level='error', fallback_msg=err_msg)
    }, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def signup_user(request):
    serializer = UserSignupSerializer(data=request.data)
    if serializer.is_valid():
        username = serializer.validated_data['username']
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        plan_tier = serializer.validated_data.get('plan_tier', 'standard')
        billing_cycle = serializer.validated_data.get('billing_cycle', 'monthly')

        if UserSubscription.objects.filter(email=email).exists():
            exists_err = f"An account registered under '{email}' already exists. Please sign in."
            messages.warning(request, exists_err)
            return Response({
                'error': exists_err,
                'messages': extract_django_messages(request, default_level='warning', fallback_msg=exists_err)
            }, status=status.HTTP_400_BAD_REQUEST)

        user_sub = UserSubscription.objects.create(
            username=username,
            email=email,
            password=password,
            plan_tier=plan_tier,
            billing_cycle=billing_cycle,
            is_active=True
        )

        user_data = UserSubscriptionSerializer(user_sub).data
        msg_text = f"Welcome to MicroNanoFabSoft, {username}! Account successfully created."
        messages.success(request, msg_text)
        sync_user_to_mongodb(user_data)
        sync_subscription_to_mongodb(user_data)

        return Response({
            'status': 'success',
            'message': msg_text,
            'user': user_data,
            'messages': extract_django_messages(request, default_level='success', fallback_msg=msg_text)
        }, status=status.HTTP_201_CREATED)

    err_text = "Registration validation failed."
    messages.error(request, err_text)
    return Response({
        'status': 'error',
        'errors': serializer.errors,
        'messages': extract_django_messages(request, default_level='error', fallback_msg=err_text)
    }, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def login_user(request):
    serializer = UserLoginSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']

        try:
            user_sub = UserSubscription.objects.get(email=email)
            if user_sub.password != password:
                pwd_err = "Incorrect password credentials."
                messages.error(request, pwd_err)
                return Response({
                    'error': pwd_err,
                    'messages': extract_django_messages(request, default_level='error', fallback_msg=pwd_err)
                }, status=status.HTTP_401_UNAUTHORIZED)
            
            user_data = UserSubscriptionSerializer(user_sub).data
            login_msg = f"Welcome back, {user_sub.username}!"
            messages.success(request, login_msg)

            sync_user_to_mongodb(user_data)

            return Response({
                'status': 'success',
                'message': login_msg,
                'user': user_data,
                'messages': extract_django_messages(request, default_level='success', fallback_msg=login_msg)
            }, status=status.HTTP_200_OK)
        except UserSubscription.DoesNotExist:
            not_found_msg = f"No account found for '{email}'. Please create an account."
            messages.warning(request, not_found_msg)
            return Response({
                'error': not_found_msg,
                'messages': extract_django_messages(request, default_level='warning', fallback_msg=not_found_msg)
            }, status=status.HTTP_404_NOT_FOUND)

    err_msg = "Invalid login payload."
    messages.error(request, err_msg)
    return Response({
        'status': 'error',
        'messages': extract_django_messages(request, default_level='error', fallback_msg=err_msg)
    }, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def process_subscription(request):
    serializer = SubscribeSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        plan_tier = serializer.validated_data['plan_tier']
        billing_cycle = serializer.validated_data.get('billing_cycle', 'monthly')
        intent_id = serializer.validated_data.get('stripe_payment_intent_id') or f"pi_mnf_{uuid.uuid4().hex[:12]}"

        user_sub, created = UserSubscription.objects.get_or_create(
            email=email,
            defaults={
                'username': email.split('@')[0],
                'password': 'password123',
                'plan_tier': plan_tier,
                'billing_cycle': billing_cycle
            }
        )

        user_sub.plan_tier = plan_tier
        user_sub.billing_cycle = billing_cycle
        user_sub.is_active = True
        user_sub.payment_reference = f"STRIPE-MNF-{uuid.uuid4().hex[:8].upper()}"
        user_sub.stripe_payment_intent_id = intent_id
        user_sub.save()

        user_data = UserSubscriptionSerializer(user_sub).data
        sync_user_to_mongodb(user_data)
        sync_subscription_to_mongodb(user_data)

        sub_msg = f"Subscription upgraded to {plan_tier.upper()} tier for {email}!"
        messages.success(request, sub_msg)

        return Response({
            'status': 'success',
            'message': sub_msg,
            'user': user_data,
            'messages': extract_django_messages(request, default_level='success', fallback_msg=sub_msg)
        }, status=status.HTTP_200_OK)

    err_msg = "Subscription data processing failed."
    messages.error(request, err_msg)
    return Response({
        'status': 'error',
        'errors': serializer.errors,
        'messages': extract_django_messages(request, default_level='error', fallback_msg=err_msg)
    }, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def create_stripe_payment_intent(request):
    plan_tier = request.data.get('plan_tier', 'standard')
    billing_cycle = request.data.get('billing_cycle', 'monthly')
    
    price_map = {'basic': 14900, 'standard': 49900, 'premium': 99900}
    amount = price_map.get(plan_tier, 49900)
    if billing_cycle == 'yearly':
        amount = int(amount * 0.8)

    intent_id = f"pi_mnf_{uuid.uuid4().hex[:16]}"
    client_secret = f"{intent_id}_secret_{uuid.uuid4().hex[:12]}"
    msg_text = f"Generated Stripe PaymentIntent for {plan_tier.upper()} license ($ {amount/100:.2f})."
    messages.info(request, msg_text)

    return Response({
        'status': 'success',
        'client_secret': client_secret,
        'payment_intent_id': intent_id,
        'amount': amount,
        'currency': 'usd',
        'messages': extract_django_messages(request, default_level='info', fallback_msg=msg_text)
    })

@csrf_exempt
@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def stripe_webhook(request):
    event_type = request.data.get('type', 'payment_intent.succeeded')
    msg_text = f"Received Stripe Webhook Event: {event_type}"
    messages.info(request, msg_text)
    return Response({
        'status': 'received',
        'event_type': event_type,
        'messages': extract_django_messages(request, default_level='info', fallback_msg=msg_text)
    })

@csrf_exempt
@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def submit_service_request(request):
    serializer = OpticalServiceRequestSerializer(data=request.data)
    if serializer.is_valid():
        service_req = serializer.save()
        msg_text = f"Simulation & CAD Brief submitted successfully for '{service_req.project_title}'!"
        messages.success(request, msg_text)
        
        req_dict = serializer.data
        req_dict['id'] = service_req.id
        sync_service_request_to_mongodb(req_dict)

        return Response({
            'status': 'success',
            'message': msg_text,
            'request_id': service_req.id,
            'messages': extract_django_messages(request, default_level='success', fallback_msg=msg_text)
        }, status=status.HTTP_201_CREATED)
    
    err_text = "Failed to record service request brief."
    messages.error(request, err_text)
    return Response({
        'status': 'error',
        'errors': serializer.errors,
        'messages': extract_django_messages(request, default_level='error', fallback_msg=err_text)
    }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes([])
@permission_classes([AllowAny])
def get_user_service_requests(request):
    email = request.query_params.get('email')
    if not email:
        return Response({'status': 'error', 'message': 'Email parameter is required.'}, status=status.HTTP_400_BAD_REQUEST)
    
    reqs = OpticalServiceRequest.objects.filter(user_email=email).order_by('-created_at')
    serializer = OpticalServiceRequestSerializer(reqs, many=True)
    return Response({
        'status': 'success',
        'requests': serializer.data
    })

@api_view(['GET'])
@authentication_classes([])
@permission_classes([AllowAny])
def admin_analytics(request):
    if not verify_admin_access(request):
        admin_err = "Unauthorized access to MicroNanoFabSoft Admin Console."
        messages.error(request, admin_err)
        return Response({
            'error': admin_err,
            'messages': extract_django_messages(request, default_level='error', fallback_msg=admin_err)
        }, status=status.HTTP_403_FORBIDDEN)

    total_users = UserSubscription.objects.count()
    total_trials = TrialRequest.objects.count()
    total_inquiries = ContactInquiry.objects.count()
    total_service_requests = OpticalServiceRequest.objects.count()

    subscribed_users = UserSubscription.objects.exclude(plan_tier='free').count()

    monthly_revenue = 0
    price_map = {'basic': 149, 'standard': 499, 'premium': 999}
    for sub in UserSubscription.objects.all():
        monthly_revenue += price_map.get(sub.plan_tier, 0)

    admin_msg = "Admin telemetry metrics generated."
    messages.success(request, admin_msg)

    return Response({
        'status': 'success',
        'metrics': {
            'total_users': total_users,
            'subscribed_users': subscribed_users,
            'total_trials': total_trials,
            'total_inquiries': total_inquiries,
            'total_service_requests': total_service_requests,
            'monthly_recurring_revenue': monthly_revenue,
            'annual_projected_revenue': monthly_revenue * 12
        },
        'messages': extract_django_messages(request, default_level='success', fallback_msg=admin_msg)
    })

@api_view(['GET'])
@authentication_classes([])
@permission_classes([AllowAny])
def get_mongodb_status(request):
    db = get_mongo_db()
    if db is not None:
        try:
            collections = db.list_collection_names()
            msg_text = "Connected to MongoDB Cloud Atlas."
            messages.success(request, msg_text)
            return Response({
                'mongodb': {
                    'connected': True,
                    'database': db.name,
                    'collections': collections
                },
                'messages': extract_django_messages(request, default_level='success', fallback_msg=msg_text)
            })
        except Exception as e:
            err_msg = f"MongoDB connection error: {e}"
            messages.error(request, err_msg)

    err_msg = "MongoDB Atlas cloud database offline."
    messages.warning(request, err_msg)
    return Response({
        'mongodb': {
            'connected': False,
            'database': 'micronanofabsoft_db',
            'collections': []
        },
        'messages': extract_django_messages(request, default_level='warning', fallback_msg=err_msg)
    })

@api_view(['GET'])
@authentication_classes([])
@permission_classes([AllowAny])
def list_admin_users(request):
    if not verify_admin_access(request):
        return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)
    
    users = UserSubscription.objects.all().order_by('-created_at')
    serializer = UserSubscriptionSerializer(users, many=True)
    return Response({
        'status': 'success',
        'users': serializer.data
    })

@csrf_exempt
@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def update_admin_user_plan(request):
    if not verify_admin_access(request):
        return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)

    user_id = request.data.get('user_id')
    new_tier = request.data.get('plan_tier')

    try:
        user_sub = UserSubscription.objects.get(id=user_id)
        user_sub.plan_tier = new_tier
        user_sub.save()
        
        user_data = UserSubscriptionSerializer(user_sub).data
        sync_user_to_mongodb(user_data)

        msg_text = f"Updated license tier for {user_sub.email} to {new_tier.upper()}."
        messages.success(request, msg_text)
        return Response({
            'status': 'success',
            'message': msg_text,
            'user': user_data,
            'messages': extract_django_messages(request, default_level='success', fallback_msg=msg_text)
        })
    except UserSubscription.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
