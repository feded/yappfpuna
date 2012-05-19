USERS = {'editor':'editor',
          'viewer':'viewer'}
GROUPS = {'editor':['group:editors']}

USER = None;

def groupfinder(userid, request):
    """Esto es una prueba de  pydoc"""
    if userid in USERS:
        return GROUPS.get(userid, [])