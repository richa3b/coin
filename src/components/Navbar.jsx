import React from "react";
import { Menubar } from "primereact/menubar";


const Navbar = () => {
    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            url: '/'  // URL for the Home item
        },
        {
            label: 'About',
            icon: 'pi pi-star',
            url: '/About'  // URL for the Features item
        },
        {
            label: 'Projects',
            icon: 'pi pi-search',
            items: [
                {
                    label: 'Components',
                    icon: 'pi pi-bolt',
                    url: '/projects/components'  // URL for the Components item
                },
                {
                    label: 'Blocks',
                    icon: 'pi pi-server',
                    url: '/projects/blocks'  // URL for the Blocks item
                },
                {
                    label: 'UI Kit',
                    icon: 'pi pi-pencil',
                    url: '/projects/ui-kit'  // URL for the UI Kit item
                },
                {
                    label: 'Templates',
                    icon: 'pi pi-palette',
                    items: [
                        {
                            label: 'Apollo',
                            icon: 'pi pi-palette',
                            url: '/projects/templates/apollo'  // URL for the Apollo item
                        },
                        {
                            label: 'Ultima',
                            icon: 'pi pi-palette',
                            url: '/projects/templates/ultima'  // URL for the Ultima item
                        }
                    ]
                }
            ]
        },
        {
            label: 'Contact',
            icon: 'pi pi-envelope',
            url: '/contact'  // URL for the Contact item
        }
    ];

    const start = (
        <img
            alt="logo"
            src="https://png.pngtree.com/png-vector/20220611/ourmid/pngtree-olympic-rings-colorful-rings-on-a-white-background-png-image_4825904.png"
            height="40"
            className="mr-2"
        />
    );

    return (
        <div className="Home">
            <Menubar
                model={items}
                start={start}
                menuButtonClassName="p-menubar-menu-button"
                onMenuButtonClick={(event) => event.stopPropagation()} // Optional: prevents event bubbling
            />
        </div>
    );
};

export default Navbar;
