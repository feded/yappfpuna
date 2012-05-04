from sqlalchemy import Column, String
from sqlalchemy.orm import relation, backref
from sqlalchemy.schema import ForeignKey
from sqlalchemy.types import Integer
from yapp.models import Base
from yapp.models.entidad_base import EntidadBase, EntidadBaseDTO
from yapp.models.roles.rol_estado import RolEstado, RolEstadoDTO
#import yapp.models.roles.rol_estado

class Rol (Base, EntidadBase):
    """Crea una Tabla Rol con 
        - _nombre: nombre del rol.
        - _estado: estado del rol
        - _esFinal: determina si un rol es o no final
        Los roles son aquellos que pueden hacer una accion en el 
        sistema
    """
    __tablename__ = "rol"
    _nombre = Column(String, nullable=False)
#    _estado = Column(Integer, nullable=True, ForeignKey('rol_estado._id'), primary_key=True)
    _estado_id = Column(Integer, ForeignKey('rol_estado._id'))
    discriminator = Column('type', String(50))
    __mapper_args__ = {'polymorphic_on': discriminator}
    _esFinal = False
    _estado = relation(RolEstado, backref=backref('rol'))
    
    def __init__(self, nombre, estado):
        self._nombre = nombre;
        self._estado = estado;
        
class RolDTO(EntidadBaseDTO):
    """Unidad de transporte para roles"""
    def __init__(self, id, nombre, estado):
        super(RolDTO, self).__init__(id);
        self._nombre = nombre;
        self._esFinal = False;
        self._estado = RolEstadoDTO(estado._id, estado._estado);
