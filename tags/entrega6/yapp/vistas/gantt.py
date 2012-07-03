'''
Created on May 25, 2012

@author: arturo
'''
from pyramid.response import Response
from pyramid.view import view_config
from xml.dom.minidom import Document
from yapp.daos.fase_dao import FaseDAO
from yapp.daos.item_dao import ItemDAO
from yapp.models.fase.fase import Fase
from yapp.models.gantt import Task
from yapp.models.item.item import Item
import datetime
 
@view_config(route_name='gantt')
def view_gantt(request):
    

    doc = Document()
    wml = doc.createElement("project")
    doc.appendChild(wml)


    id_proyecto = request.GET.get('id_proyecto')
    
    fase_dao = FaseDAO(request)
    fases = fase_dao.get_query().filter(Fase._proyecto_id == id_proyecto).order_by(Fase._orden.asc()).all();
    item_dao = ItemDAO(request)
    xml = "<project>"
    for fase in fases:
        task = Task()
        task.set_fase(fase)
        wml.appendChild(task.get_xml(doc))
        xml += task.to_xml()
        entidades = item_dao.get_items_fase(fase._id)
        for item in entidades:
            task = Task()
            task.set_item(item)
            wml.appendChild(task.get_xml(doc))
            xml += task.to_xml()
    
    xml += "</project>"
#    print xml
    # Print our newly created XML
#    print doc.toprettyxml(indent="  ")
    return Response(xml)


