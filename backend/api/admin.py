from django.contrib import admin
from .models import SoftwareProduct, TrialRequest, ContactInquiry, UserSubscription, OpticalServiceRequest

@admin.register(SoftwareProduct)
class SoftwareProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'code_name', 'category', 'version')

@admin.register(TrialRequest)
class TrialRequestAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'company', 'software_choice', 'created_at')

@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at')

@admin.register(UserSubscription)
class UserSubscriptionAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'plan_tier', 'billing_cycle', 'is_active', 'is_admin', 'created_at')

@admin.register(OpticalServiceRequest)
class OpticalServiceRequestAdmin(admin.ModelAdmin):
    list_display = ('user_name', 'user_email', 'project_title', 'service_type', 'status', 'created_at')
