import { useState } from "react";

function Authentication({flag}) {

    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")

    const HandleSubmission = (e) => {
        e.preventDefault(); 
        let url = flag ? "/v1/signup" : "/v1/login"
        fetch(url, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({username, password}),
            credentials:'include'
        }).then((response)=>{
          if(response.ok){
            setusername("")
            setpassword("")
            alert("Login Sucessfull")
          }
          else{
            alert("Invalid Request")
          }
        })
        

    }

  return (
    <>
    <div className="flex items-center justify-center min-h-screen">
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                {flag ? "Sign Up" : "Sign In"}
              </h2>
              <p className="mt-2 text-base text-gray-600">
                {flag ? "Already have an account?" : "Create a Account"}{" "}
                <a
                  href={flag? "/login" : "/signup"}
                  title=""
                  className="font-medium text-black transition-all duration-200 hover:underline"
                >
                  {flag ? "Sign In" : "Sign Up"}
                </a>
              </p>
              <form onSubmit={HandleSubmission}>
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      User Name{" "}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="Full Name"
                        id="name"
                        onChange={(e)=>setusername(e.target.value)}
                        value={username}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="text-base font-medium text-gray-900"
                      >
                        {" "}
                        Password{" "}
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="password"
                        placeholder="Password"
                        id="password"
                        onChange={(e)=>setpassword(e.target.value)}
                        value={password}
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    >
                      {flag?"Create Account" : "Login"}{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-2"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="h-full w-full">
            <img
              className="mx-auto h-full w-full rounded-md object-cover"
              src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=htmlFormat&amp;fit=crop&amp;w=1742&amp;q=80"
              alt=""
            />
          </div>
        </div>
      </section>
      </div> </div>
    </>
  );
}

export default Authentication;
