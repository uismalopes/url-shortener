import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity('links')
export default class Link {
  @PrimaryColumn('integer')
  id: number

  @Column()
  url: string

  @Column()
  code: string

  @Column()
  hits: number

  @Column({ name: 'created_at' })
  createdAt: Date

  @Column({ name: 'updated_at' })
  updatedAt: Date

  @BeforeInsert()
  setHits () {
    this.hits = 0
  }

  @BeforeInsert()
  setCreatedAt () {
    this.createdAt = new Date()
  }

  @BeforeInsert()
  @BeforeUpdate()
  setUpdatedAt(){
    this.updatedAt = new Date()
  }

}
