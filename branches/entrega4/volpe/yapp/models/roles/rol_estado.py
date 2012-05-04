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
        
class RolEstadoDTO (EntidadBaseDTO):
    def __init__(self, id, estado):
        super(RolEstadoDTO, self).__init__(id);
        self._estado = estado;