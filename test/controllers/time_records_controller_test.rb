require 'test_helper'

class TimeRecordsControllerTest < ActionController::TestCase
  setup do
    @time_record = time_records(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:time_records)
  end

  test "should create time_record" do
    assert_difference('TimeRecord.count') do
      post :create, time_record: { description: @time_record.description, end_time: @time_record.end_time, start_time: @time_record.start_time }
    end

    assert_response 201
  end

  test "should show time_record" do
    get :show, id: @time_record
    assert_response :success
  end

  test "should update time_record" do
    put :update, id: @time_record, time_record: { description: @time_record.description, end_time: @time_record.end_time, start_time: @time_record.start_time }
    assert_response 204
  end

  test "should destroy time_record" do
    assert_difference('TimeRecord.count', -1) do
      delete :destroy, id: @time_record
    end

    assert_response 204
  end
end
