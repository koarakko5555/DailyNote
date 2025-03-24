class AddDateToDiaries < ActiveRecord::Migration[8.0]
  def change
    add_column :diaries, :date, :date
  end
end
