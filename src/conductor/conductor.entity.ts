import { Entity, Property, OneToMany, Cascade, Collection } from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { Licencia } from '../licencia/licencia.entity.js'

@Entity()
export class Conductor extends BaseEntity {
  @Property({ nullable: false })
    name!: string

  @Property({ nullable: false })
    apellido!: string

  @OneToMany(() => Licencia, (licencia) => licencia.conductor, { cascade: [Cascade.ALL] })
    licencias = new Collection<Licencia>(this)
}
