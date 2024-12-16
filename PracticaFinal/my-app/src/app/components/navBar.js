import Link from "next/link";

export default function NavBar() {
    const nav = ["resumen", "project", "client", "albaranes", "proveedores", "ajustes"];

    return (
        <>
            <div className="flex items-center justify-center bg-gray-800 p-4">
                <div className="flex gap-6">
                    {nav.map((item, index) => (
                        <Link key={index} className="text-white text-lg font-medium hover:text-gray-300 transition-colors duration-300"href={`../${item}`}>
                            {item.charAt(0).toUpperCase() + item.slice(1)} 
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
