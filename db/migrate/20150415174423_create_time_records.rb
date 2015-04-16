class CreateTimeRecords < ActiveRecord::Migration
  def change
    create_table :time_records do |t|
      t.timestamp :start_time
      t.timestamp :end_time
      t.string :description

      t.timestamps null: false
    end
  end
end
