from django.shortcuts import render
from decimal import Decimal
from django.http import HttpResponseRedirect
from django.urls import reverse

def home(request):
    return render(request, 'kasyno/home.html')

def roulette(request):
    return render(request, 'kasyno/roulette.html')

def payout(request):
    if request.method == 'POST':
        bet = Decimal(request.POST.get('bet'))
        multiplier = Decimal(request.POST.get('hidden_input'))
        user = request.user
        user.userprofile.money += round(bet * multiplier, 2)
        user.userprofile.save()

        return HttpResponseRedirect(reverse('roulette'))


def register(response):
    if response.method == 'POST':
        form = RegisterForm(response.POST)
        if form.is_valid():
            user = form.save()
            user.refresh_from_db()
            user.person.birthdate = form.cleaned_data.get('birthdate')
            user.person.discord_id = form.cleaned_data.get('discord_id')
            user.person.zoom_id = form.cleaned_data.get('zoom_id')
            user.save()
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=password)
            login(response, user)

            return redirect('/')

        else:
         form = RegisterForm()

    return render(response, 'manager/register.html', {'form': form})

