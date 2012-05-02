from sqlalchemy import Column, String
from yapp.models import Base
from yapp.models.entidad_base import EntidadBase


class TipoRecurso (Base, EntidadBase):
    """Crea una Tabla RolEstado con 
        - _estado: cadena que representa el estado del rol
    """
    __tablename__ = "tipo_recurso"
    _tipo = Column(String, nullable = False)
    
    def __init__(self, tipo):
        self._tipo = tipo
        
    