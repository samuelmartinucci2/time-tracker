class TimeRecord < ActiveRecord::Base
  validates_presence_of :start_time, :end_time, :user
  validate :validate_end_time_before_start_time

  belongs_to :user

  def validate_end_time_before_start_time
    if end_time && start_time
      errors.add(:end_time, "End Date must be bigger than Start Date") if end_time < start_time
    end
  end

  def title
    I18n.localize(start_time, format: :short).unless(start_time = end_time).concatenate(" - " + I18n.localize(end_time, format: :short))
  end
end
