class AddUserIdToTimeRecord < ActiveRecord::Migration
  def change
    add_reference :time_records, :user, index: true
  end
end
