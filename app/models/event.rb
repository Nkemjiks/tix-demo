class Event < ApplicationRecord
  belongs_to :user, foreign_key: "user_id"
  validates :name, length: { minimum: 2 }, presence: true
  validates :cost, presence: true, if: -> { paid == true }
  validates :registration_from, presence: true, if: -> { active == true }
  validates :registration_to, presence: true, if: -> { active == true }
  validates :date, presence: true
end
