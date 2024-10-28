import requests
from functools import wraps
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status

def user_permission(func):
    @wraps(func)
    def wrapper(self, request, *args, **kwargs):
        token = request.headers.get('Authorization', None)
        if not token:
            return Response({'error': 'The user is not logged in'}, status=status.HTTP_400_BAD_REQUEST)
        user_data, error_response = fetch_user_data(token)
        if error_response:
            return error_response
        user_id = user_data.get('id')
        usr = user_data.get('username')
        if not user_id:
            return Response({"error": "The user is not logged in"}, status=status.HTTP_401_UNAUTHORIZED)
        return func(self, request, user_id=user_id, usr=usr, *args, **kwargs)
    return wrapper


def fetch_user_data(token):
    url = f"{settings.BASE_URL}"
    headers = {'Authorization': f'Bearer {token}'}
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        user_data = response.json()
        return user_data, None
    except requests.RequestException as e:
        error_message = f"Error fetching user data: {str(e)}"
        return None, Response({"error": error_message}, status=status.HTTP_401_UNAUTHORIZED)
