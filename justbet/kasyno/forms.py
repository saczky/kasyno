from django import forms 
    
# creating a form  
class RegisterForm(forms.Form): 
    
    userName = forms.CharField(max_length = 150) 
    email = forms.EmailField(max_length=254, required=False) 
    password = forms.CharField(widget = forms.PasswordInput()) 