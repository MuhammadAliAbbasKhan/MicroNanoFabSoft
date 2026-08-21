from django.urls import path
from . import views

urlpatterns = [
    path('health/', views.health_check, name='health_check'),
    path('products/', views.get_products, name='get_products'),
    path('request-trial/', views.request_trial, name='request_trial'),
    path('contact/', views.contact_inquiry, name='contact_inquiry'),
    path('signup/', views.signup_user, name='signup_user'),
    path('login/', views.login_user, name='login_user'),
    path('subscribe/', views.process_subscription, name='process_subscription'),
    path('stripe/create-payment-intent/', views.create_stripe_payment_intent, name='create_stripe_payment_intent'),
    path('stripe/webhook/', views.stripe_webhook, name='stripe_webhook'),
    path('service-request/', views.submit_service_request, name='submit_service_request'),
    path('service-request/my-requests/', views.get_user_service_requests, name='user_service_requests'),
    path('admin/analytics/', views.admin_analytics, name='admin_analytics'),
    path('admin/mongodb-status/', views.get_mongodb_status, name='admin_mongodb_status'),
    path('admin/users/', views.list_admin_users, name='admin_list_users'),
    path('admin/users/update-plan/', views.update_admin_user_plan, name='admin_update_user_plan'),
]
