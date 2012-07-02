from jsonpickle.pickler import Pickler
from jsonpickle.unpickler import Unpickler
from pyramid.response import Response
from pyramid.view import view_config
from yapp.daos.fase_dao import FaseDAO
from yapp.daos.atributo_fase_dao import AtributoFaseDAO
from yapp.daos.tipo_fase_dao import TipoFaseDAO
from yapp.daos.tipo_item_dao import TipoItemDAO
from yapp.daos.proyecto_dao import ProyectoDAO
from yapp.models.fase.fase import Fase
from yapp.models.fase.atributo_fase import AtributoFase
from yapp.models.fase.tipo_fase import TipoFase
from yapp.models.tipo_item.tipo_item import TipoItem
from sqlalchemy import desc, asc
import json

@view_config(route_name='obtenercrearfases')
def obtener_crear_fases(request):
    """
    @summary: Maneja las solicitudes para obtener y crear fases.
              Las fases nuevas soportan por defecto un tipo de item.
    @param request: Get para recuperar y Post para crear.
    @return: En caso de recibir un Get retorna todas las fases de un proyecto en especifico.
        En caso de recibir un Post retorna la fase creada.
    """
    

    if (request.method == 'GET'):
        proyecto_id = request.GET.get('id')
        fase_id = request.GET.get('fase_id')
        
        rd = FaseDAO(request)
        lista = [];
        p = Pickler(False,None)
        #Codigo de fede
        if (fase_id!= None and fase_id!= ""):
            fase_actual = rd.get_by_id(fase_id)
            entidad = rd.get_query().filter(Fase._proyecto_id == proyecto_id, Fase._orden<fase_actual._orden  ).order_by(Fase._orden.desc()).first()
            if (entidad!=None):
                entidadLinda = FaseLinda(entidad._id, entidad._nombre, entidad._proyecto_id,entidad._orden, entidad._comentario, entidad._estado,entidad._color)
                lista.append(p.flatten(entidadLinda))    
        elif (proyecto_id!= None and proyecto_id!= ""):
            #Codigo de leo
            #recuperamos todas las fases del proyecto
            entidades = rd.get_query().filter(Fase._proyecto_id == proyecto_id).all()
            for entidad in entidades:
                entidadLinda = FaseLinda(entidad._id, entidad._nombre, entidad._proyecto_id,entidad._orden, entidad._comentario, entidad._estado,entidad._color)
                lista.append(p.flatten(entidadLinda)) 
       
        j_string = p.flatten(lista)
        a_ret = json.dumps({'sucess': 'true', 'fases':j_string})    
        
        return Response(a_ret)
    else:
        #Recibimos un POST
        u= Unpickler()
        entidad = u.restore(request.json_body);
        
        dao = ProyectoDAO(request)
        proyecto = dao.get_by_id(entidad["_proyecto_id"])
    
        dao = FaseDAO(request)
        nueva_fase = Fase(entidad["_nombre"],proyecto,entidad["_orden"],entidad["_comentario"],entidad["_estado"],entidad["_color"])
        dao.crear(nueva_fase)
        
        #le asociamos el tipo de item
#        dao_tipo_item = TipoItemDAO(request)
#        tipo_item = dao_tipo_item.get_by_id(1)
#        nuevo_tipo_fase = TipoFase(nueva_fase,tipo_item)
#        dao_tipo_fase = TipoFaseDAO(request)
#        dao_tipo_fase.crear(nuevo_tipo_fase)
        
        lista = []
        p = Pickler()
        lista.append(p.flatten(nueva_fase))
        j_string = p.flatten(lista)
        a_ret = json.dumps({'sucess': 'true', 'fases':j_string})
    
        return Response(a_ret)

@view_config(route_name='actualizareliminarfases')
def actualizar_eliminar_fase(request):
    """
    @summary: Maneja las solicitudes para actualizar y elimninar fases.
              Al eliminar la fase se eliminan sus atributos particulares y los tipos de items que soporta.
    @param request: Delete para eliminar y Put para modificar.
    @return: En caso de recibir un Put retorna la fase creada.
        En caso de recibir un Delete retorna true en caso de exito .                   
    """
    if (request.method == 'DELETE'):
        u= Unpickler()
        entidad = u.restore(request.json_body);
        dao = FaseDAO(request)
        fase = dao.get_by_id(entidad["id"])
        
        #eliminamos los atributos particulares de la fase
        atributo_fase_dao = AtributoFaseDAO(request)
        atributos = atributo_fase_dao.get_query().filter(AtributoFase._fase_id == fase._id).all();
        for atributo in atributos:
            atributo_fase_dao.borrar(atributo);
            
        #eliminamos las asociaciones que puede tener con los tipos de items
        tipo_fase_dao = TipoFaseDAO(request)
        tipos = tipo_fase_dao.get_query().filter(TipoFase._fase_id == fase._id).all();
        for tipo in tipos:
            tipo_fase_dao.borrar(tipo);
        
        dao.borrar(fase)
        return Response(json.dumps({'sucess': 'true'}))
    else:
        #Recibimos un PUT
        u= Unpickler()
        dao = FaseDAO(request)
        entidad = u.restore(request.json_body);
        vieja = dao.get_by_id(entidad["id"])
        vieja._nombre = entidad["_nombre"]
        vieja._orden = entidad["_orden"]
        vieja._comentario = entidad["_comentario"]
        vieja._color = entidad["_color"]
        
        dao.update(vieja)
        lista = []
        p = Pickler()
        lista.append(p.flatten(vieja))
        j_string = p.flatten(lista)
        return Response(json.dumps({'sucess': 'true', 'fases':j_string}))

@view_config(route_name='obtenercrearatributofase')
def obtener_crear_atributofase(request):
    """
    @summary: Maneja las solicitudes para obtener y crear atributos particulares de una fase.
    @param request: Get para recuperar y Post para crear.
    @return: En caso de recibir un Get retorna todos los atributos particulares de una fase en especifico.
        En caso de recibir un Post retorna el atributo particular creado.                 
    """
    if (request.method == 'GET'):
        id = request.GET.get('id')
        rd = AtributoFaseDAO(request)
        entidades = rd.get_query().filter(AtributoFase._fase_id == id).all()
        lista = [];
        p = Pickler()
        for entidad in entidades:
            lista.append(p.flatten(entidad))    
        j_string = p.flatten(lista)
        a_ret = json.dumps({'sucess': 'true', 'atributofase':j_string})

        return Response(a_ret)
    else:    
        #recibio un Post
        u= Unpickler()
        entidad = u.restore(request.json_body);
        
        dao = FaseDAO(request)
        fase = dao.get_by_id(entidad["_fase_id"])
    
        dao = AtributoFaseDAO(request)
        nuevo_atributo = AtributoFase(entidad["_nombre"],fase,entidad["_descripcion"],entidad["_valor"])
        dao.crear(nuevo_atributo)
        
        lista = []
        p = Pickler()
        lista.append(p.flatten(nuevo_atributo))
        j_string = p.flatten(lista)
        a_ret = json.dumps({'sucess': 'true', 'atributofase':j_string})
    
        return Response(a_ret)

@view_config(route_name='actualizareliminaratributofase')
def actualizar_eliminar_atributofase(request):
    """
    @summary: Maneja las solicitudes para actualizar y elimninar atributos particulares de una fase.
    @param request: Delete para eliminar y Put para modificar.
    @return: En caso de recibir un Put retorna el atributo particular modificado.
        En caso de recibir un Delete retorna true en caso de exito.                         
    """
    if (request.method == 'DELETE'):
        u= Unpickler()
        entidad = u.restore(request.json_body);
        dao = AtributoFaseDAO(request)
        atributo = dao.get_by_id(entidad["id"])     
        dao.borrar(atributo)
        return Response(json.dumps({'sucess': 'true'}))

    else:
        #recibio un put
        u= Unpickler()
        dao = AtributoFaseDAO(request)
        entidad = u.restore(request.json_body);
        vieja = dao.get_by_id(entidad["id"])
        vieja._nombre = entidad["_nombre"]
        vieja._descripcion = entidad["_descripcion"]
        vieja._valor = entidad["_valor"]
        
        dao.update(vieja)
        
        lista = []
        p = Pickler()
        lista.append(p.flatten(vieja))
        j_string = p.flatten(lista)
        return Response(json.dumps({'sucess': 'true', 'atributofase':j_string}))
   
@view_config(route_name='obtenercreartipofase')
def obtener_crear_tipofase(request):
    """
    @summary: Maneja las solicitudes para obtener y asociar tipos de items a una fase en particular.
    @param request: Get para recuperar y Post para crear.
    @return: En caso de recibir un Get retorna todos los tipos de items que soporta una fase en especifico.
        En caso de recibir un Post asocia un tipo de item a una fase.                
    """
    if (request.method == 'GET'):
        id = request.GET.get('id')
        rd = TipoFaseDAO(request)
        entidades = rd.get_query().filter(TipoFase._fase_id == id).all()
        lista = [];
        p = Pickler()
        for entidad in entidades:
            a = TipoFaseLindos(entidad._id, entidad._fase._id, entidad._tipo._id,entidad._tipo._nombre)
            lista.append(p.flatten(a))    
        j_string = p.flatten(lista)
        a_ret = json.dumps({'sucess': 'true', 'tipofase':j_string})

        return Response(a_ret)
    elif (request.method == 'POST'):
        u= Unpickler()
        entidad = u.restore(request.json_body);
        
        dao = FaseDAO(request)
        fase = dao.get_by_id(entidad["_fase"])
        dao = TipoItemDAO(request)
        tipo = dao.get_by_id(entidad["_tipo"])
    
        dao = TipoFaseDAO(request)
        nuevo_tipo_fase = TipoFase(fase,tipo)
        dao.crear(nuevo_tipo_fase)
        
        lista = []
        p = Pickler()
        a = TipoFaseLindos(nuevo_tipo_fase._id, nuevo_tipo_fase._fase._id, nuevo_tipo_fase._tipo._id,nuevo_tipo_fase._tipo._nombre)
        lista.append(p.flatten(a))
        j_string = p.flatten(lista)
        a_ret = json.dumps({'sucess': 'true', 'tipofase' : j_string})
    
        return Response(a_ret)

@view_config(route_name='eliminartipofase')
def eliminar_tipofase(request):
    """
    @summary: Maneja las solicitudes elimninar soporte de tipos de item de una fase.
    @param request: Delete para eliminar.
    @return: Retorna true en caso de exito.
    """
    if (request.method == 'DELETE'):
        u= Unpickler()
        entidad = u.restore(request.json_body);
        dao = TipoFaseDAO(request)
        tipo_fase= dao.get_by_id(entidad["id"])     
        dao.borrar(tipo_fase)
        return Response(json.dumps({'sucess': 'true'}))        

class FaseLinda:
    """
    @summary: Unidad de transporte para fases.         
    """
    def __init__(self, _id, nombre, proyecto,orden,comentario, estado,color):
        self._id = _id
        self._nombre = nombre;
        self._proyecto_id = proyecto;
        self._orden = orden;
        self._comentario = comentario;
        self._estado = estado;
        self._color = color;

class TipoFaseLindos:
    """
    @summary: Unidad de transporte para tipos fases.                
    """
    def __init__(self, _id, fase, tipo,tipo_nombre):
        self._id = _id;
        self._fase = fase;
        self._tipo = tipo;
        self.tipo_nombre = tipo_nombre;
