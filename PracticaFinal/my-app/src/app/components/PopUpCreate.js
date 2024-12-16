import { useRouter } from "next/navigation";
export default function PopUpCreate({showPopup,setShowPopup}){
    const router=useRouter()
    return(
        <>
        {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-500 rounded-full p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-center text-xl font-semibold text-gray-800 mb-2">
                  Cliente creado y guardado con éxito!
                </h2>
                <p className="text-center text-gray-600 mb-6">
                  ¿Quieres asociar un proyecto a este Cliente?
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={() => {
                        setShowPopup(false)
                        router.push("../clientList")
                        
                    }}
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                  >
                    Sí, vamos!
                  </button>
                </div>
              </div>
            </div>
          )}
          </>
    )
}