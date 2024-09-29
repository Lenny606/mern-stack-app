import TreeMenuList from "./TreeMenuList.jsx";
import {useState} from "react";
import {FaChevronUp, FaChevronDown } from "react-icons/fa";
import {Link} from "react-router-dom";
// import './styles.css';

export default function TreeMenuItem({item, isChild, isOpen}) {

    const [displayCurrentChild, setDisplayCurrentChild] = useState({})
    let hasChildren = item && item.children && item.children.length;

    function handleToggleClick(currentId){
        setDisplayCurrentChild({
            ...displayCurrentChild,
            [currentId] : !displayCurrentChild[currentId]
        })
        isOpen(true);

    }

    return (
        <li>

            <div className={"menu-item-container"}>
                <Link to={item.path} className={isChild ? "child-item" : "category-item"} >
                    <p>
                        {item.label}
                    </p>
                </Link>
                {hasChildren
                    ? <span onClick={()=>handleToggleClick(item.id)}>
                        {
                            displayCurrentChild[item.id] ? <FaChevronUp  color={"black"}   /> : <FaChevronDown color={"black"} />
                        }
                    </span>
                    : null
                }
            </div>
            {/*    check for nested items*/}
            {
                hasChildren && displayCurrentChild[item.id]
                    ? <TreeMenuList list={item.children} isChild={true}/>
                    : null

            }
        </li>
    )
}