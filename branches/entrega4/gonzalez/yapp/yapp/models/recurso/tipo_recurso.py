from sqlalchemy import Column, String
from yapp.models import Base
from yapp.models.entidad_base import EntidadBase


class TipoRecurso (Base, EntidadBase):
    """
    @summary: Crea una Tabla Tipo_Recurso. Los tipos de recursos bases.
    @param _tipo: el nombre del recurso.
    """
    __tablename__ = "tipo_recurso"
    _tipo = Column(String, nullable = False)
    
    def __init__(self, tipo):
        self._tipo = tipo
        
    