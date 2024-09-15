import TreeMenuItem from "./TreeMenuItem.jsx";
import {useState} from "react";

export default function TreeMenuList({ list = [], isChild = false }) {
    const [isOpen, setIsOpen] = useState(false); // State to toggle the menu

    const toggleMenu = () => {
        setIsOpen(!isOpen); // Toggle the menu state
    };

    return (
        <div className="menu-wrapper">
            {/* Hamburger menu button */}
            {!isChild && (
                <div className="hamburger" onClick={toggleMenu}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            )}

            {/* Menu List */}
            <ul className={`menu-list-container ${isOpen ? 'active' : 'hidden'}`}>
                {
                    list && list.length
                        ? list.map((listItem) => {
                            return <TreeMenuItem key={listItem.id} item={listItem} isChild={isChild} />;
                        })
                        : null
                }
            </ul>
        </div>
    );
}