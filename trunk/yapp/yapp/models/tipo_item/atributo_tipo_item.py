from sqlalchemy.schema import Column
from sqlalchemy.types import String
from sqlalchemy.types import Boolean
from sqlalchemy.schema import ForeignKey
from sqlalchemy.types import Integer
from yapp.models import Base
from yapp.models.entidad_base import EntidadBase

class AtributoTipoItem(EntidadBase, Base):
    """Crea una Tabla AtributoTipoItem con 
        - _tipo: tipo del atributo
        - _valor: valor del atributo
        - _descripcion: descripcion del item
        - _opcional: determina si un atributo es opcional
        - _defecto: determina el valor por defecto
    """
    __tablename__ = "atributo_tipo_item"
    _tipo = Column(String, nullable=False)
    _valor = Column(String, nullable=False)
    _descripcion = Column(String, nullable=True)
    _opcional = Column(Boolean)
    _defecto = Column(String, nullable=True)
    _tipo_item_id = Column(Integer, ForeignKey('tipo_item._id'), primary_key=True)
    
    def __init__(self, tipo, valor, descripcion=None, opcional=False, defecto=None):
        self._tipo = tipo
        self._valor = valor
        self._descripcion = descripcion
        self._opcional = opcional
        self._defecto = defecto
        
        
