class TimeRecord < ActiveRecord::Base
  validates_presence_of :start_time, :user
  validate :validate_end_time_before_start_time
  validates_uniqueness_of :user, conditions: -> { where(:end_time => nil) }

  belongs_to :user

  scope :most_recent, -> { order("start_time ASC") }

  def validate_end_time_before_start_time
    if end_time && start_time
      errors.add(:end_time, "End Date must be bigger than Start Date") if end_time < start_time
    end
  end

  def self.search(query)
    if query.present?
      where(:start_time => query.to_date.beginning_of_day..query.to_date.end_of_day)
    else
      all
    end
  end
end
