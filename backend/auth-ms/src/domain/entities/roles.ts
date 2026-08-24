import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryColumn, Unique, UpdateDateColumn } from "typeorm";
import { User } from "./users";

//las entidades de typeOrm solo trabajan sobre clases
@Entity("roles")
@Unique("UQ_ROLES_NAME", ["name"])
export class Role{
  @PrimaryColumn({primaryKeyConstraintName: "PK_ROLE"})
  role_id!: number; 
  @Column({ length: 50, nullable: false })
  name!: string;

  @Column({ length: 100, nullable: false })
  description!: string;

  @CreateDateColumn({ nullable: false })
  created_at!: Date;
  @DeleteDateColumn()
  deleted_at!: Date;

  @OneToMany(() => User, user => user.role)
  users!: User[]
  //ojo typeorm al momento de consultas no carga las 
  //relaciones automaticamente sino que en el repo se 
  //las debe pedir manualmente 
}