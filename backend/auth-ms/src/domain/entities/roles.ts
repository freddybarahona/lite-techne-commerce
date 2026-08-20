import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

//las entidades de typeOrm solo trabajan sobre clases
@Entity("roles")
export class Role{
  @PrimaryColumn()
  role_id!: number; 
  @Column({ unique: true, length: 50, nullable: false })
  name!: string;

  @Column({ length: 100, nullable: false })
  description!: string;

  @CreateDateColumn({ nullable: false })
  created_at!: Date;
  @UpdateDateColumn()
  updated_at!: Date;
}