from yapp.daos.rol_privilegio_dao import RolPrivilegioDAO
from yapp.models.roles.rol_privilegio import RolPrivilegio
class Filter():
    def filter(self , request):
        if 'user' in request.session:
            return True
        else:
            return False


class Validador():
    def __init__(self, request):
        self.user = request.session['user']
    def es_visible(self, entidad):
        if (self.user._id == 1):
            return True;
        dao = RolPrivilegioDAO();
        rol = dao.get_query().filter(RolPrivilegio._rol_id == self.user._id, RolPrivilegio._entidad_padre_id == entidad._id).first();
        if (rol == None):
            return False;
        else: 
            return True;
        
        
