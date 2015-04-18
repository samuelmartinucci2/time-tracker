class TimeRecordsController < ApplicationController
  before_action :set_time_record, only:  :show
  before_action :set_users_time_record, only: [:update, :destroy]
  before_action :authenticate_user!

  # GET /time_records
  # GET /time_records.json
  def index
    @search_query = params[:q] ? params[:q] : Time.now
    @time_records = current_user.time_records.search(@search_query).most_recent

    render json: @time_records
  end

  # GET /time_records/1
  # GET /time_records/1.json
  def show
    render json: @time_record
  end

  # POST /time_records
  # POST /time_records.json
  def create
    @time_record = TimeRecord.new(time_record_params)
    @time_record.user = current_user

    if @time_record.save
      render json: @time_record, status: :created, location: @time_record
    else
      render json: @time_record.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /time_records/1
  # PATCH/PUT /time_records/1.json
  def update
    @time_record = current_user.time_records.find(params[:id])
    if @time_record.update(time_record_params)
      head :no_content
    else
      render json: @time_record.errors, status: :unprocessable_entity
    end
  end

  # DELETE /time_records/1
  # DELETE /time_records/1.json
  def destroy
    @time_record.destroy

    head :no_content
  end

  def current
    @time_record = current_user.time_records.where(:end_time => nil).first
    render json: @time_record
  end

  private

    def set_time_record
      @time_record = TimeRecord.find(params[:id])
    end

    def set_users_time_record
      @time_records = current_user.time_records.find(params[:id])
    end

    def time_record_params
      params.permit(:start_time, :end_time, :description)
    end
end
