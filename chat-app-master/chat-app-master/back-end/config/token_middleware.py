from channels.db import database_sync_to_async
import requests
from channels.middleware import BaseMiddleware


API_URL = "https://api.prounity.uz/auth/user"

@database_sync_to_async
def get_user(token):
    if not token:
        return None

    try:
        headers = {'Authorization': f'Bearer {token}'}
        response = requests.get(API_URL, headers=headers)
        response.raise_for_status()
        user_data = response.json()
        user = user_data.get('username')
        return user
    except requests.exceptions.RequestException as e:
        return None


class TokenAuthMiddleware(BaseMiddleware):
    def __init__(self, inner):
        self.inner = inner

    async def __call__(self, scope, receive, send):
        token_key = scope['query_string'].decode().split('=')[-1]
        if bool(token_key):
            scope['user'] = await get_user(token_key)
            return await super().__call__(scope, receive, send)
        scope['user'] = await get_user(None)
        return await super().__call__(scope, receive, send)

# class TokenAuthMiddleware(BaseMiddleware):
#     async def __call__(self, scope, receive, send):
#         headers = dict(scope.get('headers', []))
#         authorization_header = headers.get(b'authorization', b'').decode('utf-8')

#         if authorization_header.startswith('Bearer '):
#             token_key = authorization_header.split(' ')[1]
#             scope['user'] = await get_user(token_key)
#         else:
#             scope['user'] = None

#         return await super().__call__(scope, receive, send)