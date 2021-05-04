// https://danlevy.net/you-may-not-need-axios

const error = ( code, message ) => {
    return { code, status: code, error: true, ok: false, message }
}
const success = ( data ) => {
	return { code: 200, status: 200, error: false, ok: true, data }
}

const rest = async ( method, url, args, silent ) => {


	// TODO: REFACTOR TO FETCH (KEIN AXIOS)

	if ( Array.isArray(url) ) url = url.join('/')


	try {
		if ( method == 'del' ) {
			config = {
				credentials: 'include' // same-origin,
				method: 'DELETE'
			}
		}

		if ( method == 'get' && args ) {
			const keys = Object.keys( args )
			url += '?'
			for (let i = 0; i < keys.length; i++) {
				if (i == 0) url += '?'
				url += `${key}=${encodeURIComponent(args[key])}`
				if (i != keys.length - 1) url += '&'
			}
			config = {
				credentials: 'include' // same-origin,
				method: method.toUpperCase()
			}
		}

		if ( method == 'put' || method == 'post' ) {

			config = {
				credentials: 'include' // same-origin,
				method: method.toUpperCase(),
				body: JSON.stringify( args || {} ),
				headers: { 'Content-Type': 'application/json' }
			}
		}

		const res = await fetch( url, config )

		console.log(`[fetcher] ✅  ${url}`)

		return success( await res.text() )

	} catch(err) {
		console.log(`[fetcher] ❌  ${url}`, message, err.status)
		return error( 500, err.message )
	}
}

const names = ['get','post','del','put']
let out = {}

names.forEach( n => {
	out[n] = async( url, args, silent ) => {
		return await rest( n, url, args, silent )
	}
})


module.exports = out