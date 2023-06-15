from django.contrib import admin
from .models import UserProfile, UserType

# Register your models here.
@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'money')     
    list_filter = ('user', 'money')                       
    search_fields = ('user', 'money')  
