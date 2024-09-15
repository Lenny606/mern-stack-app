import TreeMenuItem from "./TreeMenuItem.jsx";

export default function TreeMenuList({list = [], isChild = false}) {

    return (
        <ul className={"menu-list-container"}>
            {/*list check*/}
            {
                list && list.length
                    ? list.map((listItem) => {
                        return <TreeMenuItem item={listItem} isChild={isChild}/>
                    })
                    : null
            }
        </ul>
    )
}