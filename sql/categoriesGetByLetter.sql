select *
from categories
left join card_categories on categories.id = card_categories."categoryId"
left join cards on card_categories."cardId" = cards.id
where (letter = :letter);
