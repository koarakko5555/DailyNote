class AddUserIdToDiaries < ActiveRecord::Migration[8.0]
  def change
    add_reference :diaries, :user, null: false, foreign_key: true
  end
end