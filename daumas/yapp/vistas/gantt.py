'''
Created on May 25, 2012

@author: arturo
'''
from pyramid.response import Response
from pyramid.view import view_config
from xml.dom.minidom import Document
from yapp.daos.fase_dao import FaseDAO
from yapp.daos.item_dao import ItemDAO
from yapp.models.gantt import Task
from yapp.models.item.item import Item
 
@view_config(route_name='gantt')
def view_gantt(request):
    # Create the minidom document
    doc = Document()
    
    # Create the <wml> base element
    wml = doc.createElement("project")
    doc.appendChild(wml)
    
#    # Create the main <card> element
#    maincard = doc.createElement("card")
#    maincard.setAttribute("id", "main")
#    wml.appendChild(maincard)
#    
#    # Create a <p> element
#    paragraph1 = doc.createElement("p")
#    maincard.appendChild(paragraph1)
#    
#    # Give the <p> elemenet some text
#    ptext = doc.createTextNode("This is a test!")
#    paragraph1.appendChild(ptext)
    fase_dao = FaseDAO(request)
    fases = fase_dao.get_all()
    item_dao = ItemDAO(request)
    for fase in fases:
        task = Task()
        task.set_fase(fase)
        wml.appendChild(task.get_xml(doc))
        
        entidades = item_dao.get_query().filter(Item._fase_id==fase._id)
        for item in entidades:
            task = Task()
            task.set_item(item)
            wml.appendChild(task.get_xml(doc))
    
    # Print our newly created XML
    print doc.toprettyxml(indent="  ")
    return Response(doc.toprettyxml(indent="  "))


