from sqlalchemy import Column, String
from sqlalchemy.orm import relation, backref, relationship
from sqlalchemy.schema import ForeignKey
from sqlalchemy.types import Integer
from yapp.models import Base
from yapp.models.entidad_base import EntidadBase, EntidadBaseDTO
from yapp.models.roles.rol_estado import RolEstado, RolEstadoDTO

class Rol (Base, EntidadBase):
    """Crea una Tabla Rol con 
        - _nombre: nombre del rol.
        - _estado: estado del rol
        - _esFinal: determina si un rol es o no final
        Los roles son aquellos que pueden hacer una accion en el 
        sistema
    """
    _id = Column(Integer, primary_key=True)
    __tablename__ = "rol"
    _nombre = Column(String, nullable=False)
#    _estado = Column(Integer, nullable=True, ForeignKey('rol_estado._id'), primary_key=True)
    _estado_id = Column(Integer, ForeignKey('rol_estado._id'))
    discriminator = Column('type', String(50))
    __mapper_args__ = {'polymorphic_on': discriminator}
    _esFinal = False
    _estado = relation(RolEstado, backref=backref('rol'))
    _padres = relationship("RolRol", primaryjoin="Rol._id == RolRol._rol_id")
    
    def __init__(self, nombre, estado):
        self._nombre = nombre;
        self._estado = estado;
        
class RolDTO(EntidadBaseDTO):
    """Unidad de transporte para roles"""
    def __init__(self, rol):
        super(RolDTO, self).__init__(rol._id);
        self._nombre = rol._nombre;
        self._esFinal = False;
        self._estado = RolEstadoDTO(rol._estado);
        if rol._padres != None:
            self._padres = []
            for rol_padre in rol._padres:
                self._padres.append(RolDTOP(rol_padre._padre))

class RolDTOP():
    def __init__(self, rol):
        self._id = rol._id;
        self._nombre = rol._nombre;
        self._esFinal = False;
        self._estado = RolEstadoDTO(rol._estado);
        
class RolRol(EntidadBase, Base):
    __tablename__ = "rol_rol"
    _rol_id = Column(Integer, ForeignKey('rol._id'), primary_key=True)
    _padre_id = Column(Integer, ForeignKey('rol._id'), primary_key=True)
    
    _rol = relation(Rol, primaryjoin=_rol_id == Rol._id)
    _padre = relation(Rol, primaryjoin=_padre_id == Rol._id);
    def __init__(self, rol_id, padre_id):
        self._rol_id = rol_id;
        self._padre_id = padre_id;
    
    
class RolRolDTO:
    def __init__(self, RolRol):
        self._rol = RolDTO(RolRol._rol);
        self._padre = RolDTO(RolRol._padre)
