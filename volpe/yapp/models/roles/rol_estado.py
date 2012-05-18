from sqlalchemy import Column, String
from yapp.models import Base
from yapp.models.entidad_base import EntidadBase, EntidadBaseDTO


class RolEstado (Base, EntidadBase):
    """Crea una Tabla RolEstado con 
        - _estado: cadena que representa el estado del rol
    """
    __tablename__ = "rol_estado"
    _estado = Column(String, nullable = False)
    
    def __init__(self, estado):
        self._estado = estado
        
class RolEstadoDTO ():
    def __init__(self, estado):
        self._id = estado._id,
        self._estado = estado._estado;