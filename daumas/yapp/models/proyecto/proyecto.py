from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, Integer, String, String
from yapp.models import Base
from yapp.models.entidad_padre import EntidadPadre

class Proyecto(EntidadPadre):
    """
    @summary: Crea una Tabla Proyecto. 
    @param _nombre: nombre del proyecto.
    @param _prioridad: representa la prioridad del proyecto.
    @param _estado: estado actual del proyecto.
    @param _lider: lider del proyecto.
    @param _nota: anotacion sobre el proyecto.
    @param _fecha_creacion: fecha de creacion del proyecto.
    @param _fecha_modificacion: fecha de ultima modificacion del proyecto.
    """
#    __mapper_args__ = {'polymorphic_identity': 'proyecto'}
    _id = Column(Integer, ForeignKey('entidad_padre._id'), primary_key=True)
    __tablename__ = "proyecto"
    
    _autor = Column(String, nullable=False)
    _prioridad = Column(Integer, nullable=False)
    _estado = Column(String, nullable=False)
    _lider = Column(String, nullable=False)
    _nota = Column(String, nullable=True)
    _fecha_creacion = Column(String, nullable=False)
    _fecha_modificacion = Column(String, nullable=False)
    def __init__(self, nombre, autor, prioridad, estado, lider, nota, fecha_creacion, fecha_modificacion):
        self._nombre = nombre;
        self._autor = autor;
        self._prioridad = prioridad;
        self._estado = estado;
        self._lider = lider;
        self._nota = nota;
        self._fecha_creacion = fecha_creacion;
        self._fecha_modificacion = fecha_modificacion;
        
class ProyectoDTO():
    def __init__(self, proyecto):
        if (proyecto == None):
            return
        self._id = proyecto._id;
        self._nombre = proyecto._nombre;
        self._descripcion = proyecto._descripcion;
