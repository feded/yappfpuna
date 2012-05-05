from yapp.daos.proyecto_dao import ProyectoDAO
from yapp.daos.rol_privilegio_dao import RolPrivilegioDAO
from yapp.models.esquema.esquema import Esquema
from yapp.models.fase.fase import Fase
from yapp.models.proyecto.proyecto import Proyecto
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
        self.dao = RolPrivilegioDAO();
        if (isinstance(entidad, Esquema)):
            return self.validar_esquema(entidad)
        if (isinstance(entidad, Fase)):
            return self.validar_fase(entidad)
        if (isinstance(entidad, Proyecto)):
            return self.validar_proyecto(entidad)
        
    def validar_proyecto(self, entidad):
        return self.validar_entidad(entidad)
    
    def validar_fase(self, entidad):
        print "Validando fase"
        bandera = self.validar_proyecto(entidad._proyecto);
        proyecto = self.validar_entidad(entidad)
        return bandera or proyecto
    
    def validar_esquema(self, entidad):
        puede_esquema = self.validar_entidad(entidad)
        puede_fase = self.validar_fase(entidad._fase);
        return puede_esquema or puede_fase
    
    def validar_entidad(self, entidad):
        rol = self.dao.get_query().filter(RolPrivilegio._rol_id == self.user._id, RolPrivilegio._entidad_padre_id == entidad._id).first();
        return rol != None
        
        
