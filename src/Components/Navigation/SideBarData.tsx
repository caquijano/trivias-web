import React from 'react'
import { IoEye, IoGrid, IoHome , IoClipboardSharp, IoPeople, IoStatsChartSharp} from 'react-icons/io5';

export const SideBarData =[
    {
        title: "Categorias" ,
        icon: <IoGrid/>,
        link: "/categories",
        rol: "admin"
    },
    {
        title: "Estadisticas" ,
        icon: <IoStatsChartSharp/>,
        link: "/Home",
        
    },
    {
        title: "Otros" ,
        icon: <IoEye/>,
        link: "/Home",
        
    },
    {
        title: "mas de otros" ,
        icon: <IoEye/>,
        link: "/Home",
        
    },
]
