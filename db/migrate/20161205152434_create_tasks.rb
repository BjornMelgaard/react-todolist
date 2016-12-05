class CreateTasks < ActiveRecord::Migration[5.0]
  def change
    create_table :tasks do |t|
      t.boolean :done
      t.string :name
      t.references :project, foreign_key: true
      t.timestamp :deadline
      t.integer :position

      t.timestamps
    end
  end
end
