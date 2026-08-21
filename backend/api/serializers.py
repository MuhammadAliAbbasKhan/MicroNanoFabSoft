from rest_framework import serializers
from .models import SoftwareProduct, TrialRequest, ContactInquiry, UserSubscription, OpticalServiceRequest

class SoftwareProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = SoftwareProduct
        fields = '__all__'

class TrialRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrialRequest
        fields = '__all__'

class ContactInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInquiry
        fields = '__all__'

class OpticalServiceRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpticalServiceRequest
        fields = '__all__'

class UserSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSubscription
        fields = ['id', 'username', 'email', 'plan_tier', 'billing_cycle', 'is_active', 'is_admin', 'payment_reference', 'stripe_customer_id', 'stripe_payment_intent_id', 'created_at']

class UserSignupSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(max_length=128)
    plan_tier = serializers.CharField(max_length=20, default='standard')
    billing_cycle = serializers.CharField(max_length=20, default='monthly')

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=128)

class SubscribeSerializer(serializers.Serializer):
    email = serializers.EmailField()
    plan_tier = serializers.CharField(max_length=20)
    billing_cycle = serializers.CharField(max_length=20, default='monthly')
    payment_method = serializers.CharField(max_length=50, default='stripe')
    stripe_payment_intent_id = serializers.CharField(max_length=100, required=False, allow_blank=True)
