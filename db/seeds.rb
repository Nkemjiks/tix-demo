User.create!(
  name: "Jane Doe",
  email: "janedoes@email.com",
  password: "testing",
)

5.times do |i|
  Event.create(
    name: "Event #{i + 1}",
    paid: "false",
    active: true,
    registration_from: Time.utc(2020, 6, 17),
    registration_to: Time.utc(2020, 8, 20),
    date: Time.utc(2020, 8, 22),
    user_id: 1,
  )
end
puts "5 free events created"

3.times do |i|
  Event.create(
    name: "Event #{i + 6}",
    paid: true,
    cost: 2000,
    registration_from: Time.utc(2020, 6, 17),
    registration_to: Time.utc(2020, 7, 12),
    date: Time.utc(2020, 8, 22),
    user_id: 1,
  )
end
puts "3 paid events created"
