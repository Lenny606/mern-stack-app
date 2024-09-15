import TreeMenuList from "./TreeMenuList.jsx";
import treeMenuData from "./data";

export default function TreeMenu({menu = []}) {
    //menu is created from more components

    return <div className={"tree-menu-container"}>
        {
            treeMenuData && treeMenuData.length ?
                <TreeMenuList list={treeMenuData}/> :
                <p>No Menu data</p>
        }
    </div>

}