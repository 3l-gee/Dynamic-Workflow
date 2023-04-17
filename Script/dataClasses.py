# -*- coding: utf-8 -*-
"""
Created on Sun Mar 26 19:25:15 2023

@author: Raphael_Gerth
"""
from typing import Union
from typing import List
from dataclasses import dataclass

#Hirachy : Entity / Service / Actors

#Links : Data / Files / Feature

#-----Basic constructors-----
@dataclass 
class BoxInfo : 
    title : str
    info : str

@dataclass
class BoxPosition :
    xTop : int
    yRight : int
    xBottom : int
    yLeft : int
        
@dataclass
class Link :
    xStart : int
    yStart : int
    xEnd : int
    yEnd : int
    
@dataclass
class Style:
    color : str
    thickness : int
    maxZoom : int
    minZoom : int
    
#-----Combined Constructors Functions-----
@dataclass
class BoxFunction : 
    text : BoxInfo
    box : BoxPosition
    style : Style
    
    def textInfo (self) : 
        print("Title    : {0}".format(self.text.title))
        print("Text     : {0}".format(self.text.info))
        
    def boxInfo (self) : 
        print("{0}/{1} - - {2}/{3}".format(self.box.xTop, self.box.yLeft, self.box.xTop, self.box.yRight))
        print("{0}/{1} - - {2}/{3}".format(self.box.xBottom, self.box.yLeft, self.box.xBottom, self.box.yRight))
        
    def styleInfo (self) : 
        print("color     : {0}".format(self.style.color))
        print("thickness : {0}".format(self.style.thickness))
        print("Max Zoom  : {0}".format(self.style.maxZoom))
        print("Min Zoom  : {0}".format(self.style.minZoom))
        
    def info (self) : 
        self.textInfo()
        print("---------------------------------------")
        self.boxInfo()
        print("---------------------------------------")
        self.styleInfo()
        
@dataclass
class WorkflowLine :
    link : Link
    style : Style
    nodeA : BoxFunction
    nodeB : BoxFunction
    
    def Connexions (self) :
        print("connections between : {0} and {1}".format(self.nodeA.text.title, self.nodeB.text.title))
        
#-----Final Constructor-----
class Entity(BoxFunction) : 
    def __init__(self,text, box, style = None):
        super(Entity, self).__init__(text, box, style = None)
        self.style = Style("AA", 10, 10, 0)
            
class Service(BoxFunction) : 
    def __init__(self,text, box, style = None):
        super(Service, self).__init__(text, box, style = None)
        self.style = Style("BB", 6, 10, 0)

class Actors(BoxFunction) : 
    def __init_(self, text, box, style = None) : 
        super(Service, self).__init__(text, box, style = None)
        self.style = Style("CC", 1, 10, 10)
        
class DataLink(WorkflowLine) :
    def __init__ (self, nodeA, nodeB, style = None, link = None) :
        super(DataLink,self).__init__(self, nodeA, nodeB, style = None, link = None)
        self.style = Style("FF", 1,10,10)
        self.link = None
        
class FileLink(WorkflowLine) :
    def __init__(self, nodeA, nodeB, style = None, link = None) :
        super(FileLink, self).__init__(self, nodeA, nodeB, style = None, link = None)
        self.style = Style("GG", 1,10,10)
        self.link = None

class FeatureLink(WorkflowLine) :
    def __init__(self, nodeA, nodeB, style = None, link = None) :
        super(FeatureLink,self).__init__(self, nodeA, nodeB, style = None, link = None)
        self.style = Style("JJ", 1,10,10)
        self.link = None
    
class Graph() :
    def __init__ (self, nodeListe, edgesListe): 
        self.nodes = nodeListe
        self.edges = edgesListe
        
    
#-----Code-----
    
    
    
text1 = BoxInfo("My Title", "Some info")
box1 = BoxPosition(0,0,10,10)

test1 = Entity(text1, box1)

text2 = BoxInfo("2nd Title", "More info")
box2 = BoxPosition(20,20,15,15)

test2 = Service(text2, box2)

link1 = Link(0,0,10,10)
style1 = Style("FF",1,1,10)

link = WorkflowLine(link1,style1,test1,test2)

    