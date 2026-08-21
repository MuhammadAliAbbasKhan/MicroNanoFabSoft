from django.db import models

class SoftwareProduct(models.Model):
    name = models.CharField(max_length=255)
    code_name = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    category = models.CharField(max_length=100, default='E-Beam & Lithography Simulation')
    version = models.CharField(max_length=20, default='2026.1')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class TrialRequest(models.Model):
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    company = models.CharField(max_length=255)
    software_choice = models.CharField(max_length=255, default='BEAMER - E-Beam Lithography Data Prep')
    comments = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} ({self.company}) - {self.software_choice}"

class ContactInquiry(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    subject = models.CharField(max_length=255)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Inquiry from {self.name} - {self.subject}"

class UserSubscription(models.Model):
    TIER_CHOICES = [
        ('basic', 'Academic Litho License ($149/mo)'),
        ('standard', 'Commercial Fab Suite ($499/mo)'),
        ('premium', 'Enterprise Litho Foundry ($999/mo)'),
    ]

    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    plan_tier = models.CharField(max_length=20, choices=TIER_CHOICES, default='standard')
    billing_cycle = models.CharField(max_length=20, default='monthly')
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    payment_reference = models.CharField(max_length=100, blank=True, null=True)
    stripe_customer_id = models.CharField(max_length=100, blank=True, null=True)
    stripe_payment_intent_id = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.username} ({self.email}) - {self.plan_tier}"

class OpticalServiceRequest(models.Model):
    SERVICE_CHOICES = [
        ('beamer_data_prep', 'BEAMER - E-Beam Data Prep & Proximity Effect Correction'),
        ('lab_3d_litho', 'LAB - 3D Optical & E-Beam Lithography Simulation'),
        ('tracer_monte_carlo', 'TRACER - Monte Carlo PSF & Energy Deposition Calculation'),
        ('prosem_metrology', 'ProSEM - SEM Image Analysis & CD Metrology'),
        ('beamer_3d_greyscale', 'BEAMER 3D - Greyscale Lithography Surface Profiling'),
    ]

    user_name = models.CharField(max_length=255)
    user_email = models.EmailField()
    company_name = models.CharField(max_length=255, blank=True, null=True)
    plan_tier = models.CharField(max_length=50, default='standard')
    project_title = models.CharField(max_length=255)
    service_type = models.CharField(max_length=100, choices=SERVICE_CHOICES, default='beamer_data_prep')
    industry = models.CharField(max_length=100, default='semiconductor')
    wavelength_range = models.CharField(max_length=100, default='100 kV Acceleration Voltage')
    analysis_tools = models.CharField(max_length=255, default='PMMA Positive Resist, 300mm Silicon Wafer')
    system_specifications = models.TextField(blank=True, null=True)
    cad_file_attached = models.CharField(max_length=255, default='GDSII Layout Provided')
    status = models.CharField(max_length=50, default='Pending Analysis')
    admin_notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Request by {self.user_email} - {self.project_title}"
