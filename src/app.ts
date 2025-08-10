import 'reflect-metadata'
import express from 'express'
import { trenRouter } from './tren/tren.routes.js'
import { orm, syncSchema } from './shared/db/orm.js'
import { RequestContext } from '@mikro-orm/core'
import { recorridoRouter } from './recorrido/recorrido.routes.js'
import { tipoCargaRouter } from './tipoCarga/tipoCarga.routes.js'
import { conductorRouter } from './conductor/conductor.routes.js'
import { cargaRouter } from './carga/carga.routes.js'
import { licenciaRouter } from './licencia/licencia.routes.js'
import { estadoTrenRouter } from './estadoTren/estadoTren.routes.js'
import { catRouter } from './categoriaDenuncia/categoriaDenunica.routes.js'
import { observacionRouter } from './observacion/observacion.routes.js'
import { lineaCargaRouter } from './lineaCarga/lineaCarga.routes.js'
import { viajeRouter } from './viaje/viaje.routes.js'

const app = express()
app.use(express.json())

app.use((req, res, next) => {
  RequestContext.create(orm.em, next)
})

app.use('/api/carga', cargaRouter) // Gonza
app.use('/api/categoriaDenuncia', catRouter) // Carlos
app.use('/api/lineaCarga', lineaCargaRouter) // Santi
app.use('/api/conductor', conductorRouter) // Carlos
app.use('/api/estadoTren', estadoTrenRouter) // Santi
app.use('/api/licencia', licenciaRouter) // Santi
app.use('/api/observacion', observacionRouter) // Carlos
app.use('/api/recorrido', recorridoRouter) // Santi
app.use('/api/tipoCarga', tipoCargaRouter) // Gonza
app.use('/api/tren', trenRouter) // Gonza
app.use('/api/viaje', viajeRouter) // Todos

app.use((_, res) => {
  return res.status(404).send({ message: 'Ruta no encontrada' })
}
)

//test para el login
app.post('api/auth/login', (req,res) => {
  const {email, password} = req.body
  if (email === 'admin@admin.com' && password === 'admin') {
    const data = { user: 'admin', role: 'admin', token: 'token' }
    return res.status(200).send({ message: 'Login exitoso', data })
  }
})

await syncSchema() // nunca en produccion

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000/')
})
