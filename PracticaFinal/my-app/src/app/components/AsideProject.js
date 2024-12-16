export default function AsideProject({client}){
    
    return(
        <div className="flex flex-col w-1/4 h-full pl-5 space-y-4 mr-2">
        
            <div className="bg-white border border-gray-300 rounded-xl shadow-xl flex flex-col items-center p-6 space-y-4">
                <p className="w-full text-3xl text-center font-bold text-gray-800">Cliente</p>
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300">
                {client?.logo ? (
                    <img className="object-cover w-full h-full" src={client.logo} alt="Logo Cliente" />
                ) : (
                    <p className="text-gray-500 text-sm flex items-center justify-center w-full h-full">
                        Sin logo
                    </p>
                )}
            </div>
    
            <div className="w-full text-center">
                <p className="text-lg font-semibold text-gray-700">Domicilio Fiscal</p>
                <p className="text-gray-600">
                    {client?.address
                        ? `${client.address.street}, ${client.address.number}, ${client.address.postal}, ${client.address.province}`
                        : "No disponible"}
                </p>
            </div>
    
            <div className="w-full text-center">
                <p className="text-lg font-semibold text-gray-700">CIF</p>
                <p className="text-gray-600">{client.cif || "No disponible"}</p>
            </div>
        </div>
        <div className="bg-white border border-gray-300 rounded-xl shadow-xl flex flex-col items-center p-6 space-y-4 flex-1">
            <p className="text-3xl font-bold text-gray-800">Notas</p>
            <textarea
                className="w-full h-full border rounded-md p-3 text-gray-700"
                placeholder="Introduce notas"
            />
        </div>
    </div>
    
    )
       
       
}